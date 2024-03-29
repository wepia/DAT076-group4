import React from "react";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import axios, { AxiosStatic } from "axios";
import Registration from "./RegistrationForm";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

test("If the account registration were successfull a popup should tell that to the user", async () => {
  render(<Registration />);

  const userNameField = screen.getByLabelText("Username");
  fireEvent.change(userNameField, { target: { value: "testuser" } });

  const emailField = screen.getByLabelText("Email");
  fireEvent.change(emailField, { target: { value: "test@test.com " } });

  const passwordField = screen.getByLabelText("Password");
  fireEvent.change(passwordField, { target: { value: "password" } });

  const confirmPasswordField = screen.getByLabelText("Confirm Password");
  fireEvent.change(confirmPasswordField, { target: { value: "password" } });

  const genderField = screen.getByLabelText("Gender");
  fireEvent.change(genderField, { target: { value: "male" } });

  const birthdateField = screen.getByLabelText("Birthdate");
  fireEvent.change(birthdateField, { target: { value: "2022-02-21" } });

  const registerButton = screen.getByText("Register");
  await act(async () => {
    fireEvent.click(registerButton);
  });

  waitFor(() => {
    expect(
      screen.getByText(/Account Registered Successfully!/)
    ).toBeInTheDocument();
  });    
  })


test("If password != confirm_password the popup for this error should be displayed", async () => {
  render(<Registration />);

  const userNameField = screen.getByLabelText("Username");
  fireEvent.change(userNameField, { target: { value: "testuser" } });

  const emailField = screen.getByLabelText("Email");
  fireEvent.change(emailField, { target: { value: "test@test.com " } });

  const passwordField = screen.getByLabelText("Password");
  fireEvent.change(passwordField, { target: { value: "password" } });

  const confirmPasswordField = screen.getByLabelText("Confirm Password");
  fireEvent.change(confirmPasswordField, { target: { value: "p" } });

  const genderField = screen.getByLabelText("Gender");
  fireEvent.change(genderField, { target: { value: "male" } });

  const birthdateField = screen.getByLabelText("Birthdate");
  fireEvent.change(birthdateField, { target: { value: "2022-02-21" } });

  const registerButton = screen.getByText("Register");
  await act(async () => {
    fireEvent.click(registerButton);
  });

  expect(screen.getByText(/Passwords didn't match!/)).toBeInTheDocument();
});

test("If the registration were unsuccessfull then the popup for this should be displayed", async () => {
  mockedAxios.post.mockRejectedValue({
    status: 400,
  });
  render(<Registration />);

  const userNameField = screen.getByLabelText("Username");
  fireEvent.change(userNameField, { target: { value: "testuser" } });

  const emailField = screen.getByLabelText("Email");
  fireEvent.change(emailField, { target: { value: "test@test.com " } });

  const passwordField = screen.getByLabelText("Password");
  fireEvent.change(passwordField, { target: { value: "password" } });

  const confirmPasswordField = screen.getByLabelText("Confirm Password");
  fireEvent.change(confirmPasswordField, { target: { value: "p" } });

  const genderField = screen.getByLabelText("Gender");
  fireEvent.change(genderField, { target: { value: "male" } });

  const birthdateField = screen.getByLabelText("Birthdate");
  fireEvent.change(birthdateField, { target: { value: "2022-02-21" } });

  const registerButton = screen.getByText("Register");
  await act(async () => {
    fireEvent.click(registerButton);
  });

  
  waitFor(() => {
    expect(screen.getByText(/Registration Failed!/)).toBeInTheDocument();
  });
  })

