import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import ProfileCard from "../ProfileCard";

test("displaying a profile card", async () => {
  // Arrange

  const { container } = render(
    <ProfileCard
      about="one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty"
      avatar="https://via.placeholder.com/150"
      displayName="Display Name"
      username="username"
    />
  );
  expect(screen.queryByText("...", { exact: false })).toBeInTheDocument();
  expect(container).toMatchSnapshot();

  // Act

  const user = userEvent.setup();
  user.click(screen.getByText(/read more/i));

  // Assert

  expect(await screen.findByText(/read less/i)).toBeInTheDocument();
  expect(screen.queryByText("...", { exact: false })).not.toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
