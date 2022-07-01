import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';
import {
    Chat,
    Channel,
    ChannelHeader,
    ChannelList,
    LoadingIndicator,
    MessageInput,
    MessageList,
    Thread,
    Window,
} from 'stream-chat-react';
import { getUnexpiredToken } from '../../lib/api-helpers';
import { createChatToken } from '../api/chat/token';
import { isProd } from '../../lib/environment';

type ChatProps = {
    userId: string;
    userToken: string;
    chatApiKey: string;
};
const ChatPage: React.FC<ChatProps> = ({ userId, userToken, chatApiKey }) => {
    const [chatClient, setChatClient] = React.useState<StreamChat | null>(null);

    useEffect(() => {
        const initChat = async () => {
            const client = StreamChat.getInstance(chatApiKey);
            // open the WebSocket connection to start receiving events
            await client.connectUser({ id: userId }, userToken);
            setChatClient(client);
        };

        initChat();

        // close the WebSocket connection when component dismounts
        return () => {
            chatClient?.disconnectUser();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!chatClient) {
        return <LoadingIndicator />;
    }

    const filters = { type: 'messaging', members: { $in: [userId] } };
    const sort = { last_message_at: -1 };

    return (
        <>
            <div>Chats</div>
            <Chat client={chatClient} theme="messaging light">
                {/* <ChannelList filters={filters} sort={sort} /> */}
                <ChannelList filters={filters} />
                <Channel>
                    <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread />
                </Channel>
            </Chat>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<ChatProps> = async (ctx) => {
    if (isProd()) {
        return {
            notFound: true,
        };
    }

    const token = await getUnexpiredToken(ctx.req, ctx.res);
    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?r=${encodeURIComponent(ctx.resolvedUrl)}`,
            },
            props: {},
        };
    }

    const chatToken = await createChatToken(token.jwt);

    return {
        props: {
            userId: token.id,
            userToken: chatToken.token,
            chatApiKey: process.env.STREAM_CHAT_API_KEY!,
        },
    };
};

export default ChatPage;
