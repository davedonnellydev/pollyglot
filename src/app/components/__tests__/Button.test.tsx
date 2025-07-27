import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../Button";

describe("Button component", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders button with correct children", () => {
    render(<Button onClick={mockOnClick}>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("calls onClick when button is clicked", () => {
    render(<Button onClick={mockOnClick}>Click me</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("renders button with correct styling", () => {
    render(<Button onClick={mockOnClick}>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("button");
  });

  it("handles different button text content", () => {
    render(<Button onClick={mockOnClick}>Translate</Button>);
    expect(
      screen.getByRole("button", { name: "Translate" })
    ).toBeInTheDocument();
  });

  it("handles complex children content", () => {
    render(
      <Button onClick={mockOnClick}>
        <span>Start</span> <strong>Over</strong>
      </Button>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Over")).toBeInTheDocument();
  });

  it("is accessible with proper role and click handling", () => {
    render(<Button onClick={mockOnClick}>Accessible Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });
});
