import React from 'react';
import Link from 'next/link';
import { SkillrDto } from '../../../lib/types/skillr';
import { authedFetch } from '../../../lib/authed-fetch';

type SkillrCardProps = {
    skillr: SkillrDto;
    isLoggedIn: boolean;
};

const SkillrCard: React.FC<SkillrCardProps> = ({ skillr, isLoggedIn }) => {
    const [isFavorite, setIsFavorite] = React.useState(skillr.isFavourite || false);

    const addFavorite = (skillrId: string) => {
        return authedFetch(`/api/favorites/${skillrId}`, {
            method: 'POST',
        })
            .then((res) => res.json())
            .then(() => setIsFavorite(true));
    };
    const removeFavorite = (skillrId: string) => {
        return authedFetch(`/api/favorites/${skillrId}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then(() => setIsFavorite(false));
    };

    return (
        <span key={skillr.id}>
            {isLoggedIn ? (
                isFavorite ? (
                    <span className="heart-full" onClick={() => removeFavorite(skillr.id)} />
                ) : (
                    <span className="heart-empty" onClick={() => addFavorite(skillr.id)} />
                )
            ) : (
                ''
            )}
            {skillr.isAvailableNow && (
                <span
                    style={{
                        backgroundColor: 'green',
                        borderRadius: '50%',
                        height: '10px',
                        width: '10px',
                        display: 'inline-block',
                        marginRight: '5px',
                    }}
                />
            )}
            <img
                src={skillr.profileImage}
                style={{ height: '150px', width: '200px' }}
                alt={`Profile image for @${skillr.username}`}
            />
            <Link href="/skillrs/[id]" as={`/skillrs/${skillr.id}`}>
                <a>@{skillr.username}</a>
            </Link>
            <sub>{skillr.skills[0].skill.name}</sub>
        </span>
    );
};

export default SkillrCard;
