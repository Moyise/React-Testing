import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { getUser } from "./getUser";
import { mocked } from "ts-jest/utils";
import userEvent from "@testing-library/user-event";

jest.mock("./getUser");
const mockGetUser = mocked(getUser, true);

describe("Test suite", () => {
  beforeEach(async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());
  });

  // test("should render the App component", () => {
  //   screen.debug();
  // });

  test("should select the passed children", () => {
    //const text = screen.getByText("Input:");
    //const text = screen.getAllByText(/Input/);
    //expect(text).toBeInTheDocument();
    expect(screen.getAllByText(/Input/).length).toEqual(1);
  });

  test("should select input element by its role", () => {
    const role = screen.getAllByRole("textbox")[0];
    expect(role).toBeInTheDocument();
  });

  test("should select a label element by placeholder text", () => {
    const placeholder = screen.getAllByPlaceholderText("Example")[0];
    expect(placeholder).toBeInTheDocument();
  });

  test("should select input element by its role with queryByRole", () => {
    //const role = screen.queryByRole("textbox");
    const role = screen.queryByRole("whatever");
    //console.log(role);
    expect(role).toBeNull();
  });
});

describe("When the component fetch the user successfully", () => {
  beforeEach(() => {
    mockGetUser.mockClear();
  });

  test("should call getUser once", async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1));
  });

  test("should render the username passed", async () => {
    const name = "Moyise";
    //mockGetUser.mockImplementationOnce(() => Promise.resolve({ id: "1", name }));
    mockGetUser.mockResolvedValueOnce({ id: "1", name });
    render(<App />);
    expect(screen.queryByText(/username/)).toBeNull();
    expect(await screen.findByText(/username/)).toBeInTheDocument();
    expect(await screen.findByText(/name/)).toBeInTheDocument();
  });
});

describe("When user type in the input element", () => {
  test("should display the text in the screen", async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());

    //expect(screen.getByText(/You typed: .../));

    await userEvent.type(screen.getByRole("textbox"), "Moyise");

    //expect(screen.getByText(/You typed: Moyise/));
  });
});
