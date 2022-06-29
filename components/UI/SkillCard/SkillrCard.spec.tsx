import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import SkillrCard from '../SkillrCard';

test('displaying a skillr', async () => {
    // Arrange

    const { container } = render(
        <SkillrCard
            skillr={{
                id: '1',
                username: 'username',
                displayName: '',
                profileImage: 'https://via.placeholder.com/150',
                about: '',
                instagram: '',
                linkedin: '',
                isAvailableNow: true,
                skills: [
                    {
                        skillrSkillId: '1',
                        skillId: 1,
                        skill: {
                            id: 1,
                            lightIcon: '',
                            lightIconFilename: '',
                            darkIcon: '',
                            darkIconFilename: '',
                            popularIcon: '',
                            popularIconFilename: '',
                            name: 'Skillr skill name',
                            description: '',
                            disabled: false,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                            parentId: -1,
                        },
                        ratePerMinute: 10,
                        createdAt: new Date().toISOString(),
                        submitDate: new Date().toISOString(),
                        preApprovedRate: true,
                        state: 3,
                        brief: '',
                        credentials: [],
                        isInstantMatch: false,
                        showcases: [],
                        showcaseLinks: [],
                    },
                ],
                rating: 0,
                localAvailability: undefined,
            }}
            isLoggedIn={false}
        />
    );

    // Act

    // Assert

    expect(await screen.findByText(/\@username/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
});
