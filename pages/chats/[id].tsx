import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';
import {
    Chat,
    Channel,
    ChannelHeader,
    LoadingIndicator,
    MessageInput,
    MessageList,
    Thread,
    Window,
} from 'stream-chat-react';
import { getUnexpiredToken } from '../../lib/api-helpers';
import { createChatToken } from '../api/chat/token';
import { syncUser } from '../api/chat/sync-user/[userId]';

type DirectMessageProps = {
    userId: string;
    otherId: string;
    userToken: string;
    chatApiKey: string;
};
const DirectMessage: React.FC<DirectMessageProps> = ({ userId, otherId, userToken, chatApiKey }) => {
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

    const channel = chatClient.channel('messaging', undefined, {
        // add as many custom fields as you'd like
        members: [userId, otherId],
    });

    return (
        <>
            <div>Chat</div>
            <Chat client={chatClient} theme="messaging light">
                <Channel channel={channel}>
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

export const getServerSideProps: GetServerSideProps<DirectMessageProps> = async (ctx) => {
    const otherId = Array.isArray(ctx.params?.id) ? ctx.params?.id[0] : ctx.params?.id;
    if (!otherId) {
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

    // sync the OTHER user with stream in case they're not already
    await syncUser(token.jwt, otherId);

    const chatToken = await createChatToken(token.jwt);

    return {
        props: {
            userId: token.id,
            otherId,
            userToken: chatToken.token,
            chatApiKey: process.env.STREAM_CHAT_API_KEY!,
        },
    };
};

export default DirectMessage;
