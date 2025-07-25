import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../header";

describe("Header component", () => {
  it("renders the header element", () => {
    render(<Header />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the image with the correct alt text", () => {
    render(<Header />);
    const imageElement = screen.getByAltText(
      "A brightly coloured cartoon parrot surrounded by stars"
    );
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/parrot.png");
  });

  it("renders the main title and subtitle", () => {
    render(<Header />);
    const mainTitle = screen.getByRole("heading", {
      level: 1,
      name: "PollyGlot",
    });
    const subtitle = screen.getByRole("heading", {
      level: 2,
      name: "Perfect Translation Every Time",
    });
    expect(mainTitle).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it("applies the correct class names", () => {
    render(<Header />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass("header");
    const containerElement = screen.getByText("PollyGlot").closest("div");
    expect(containerElement).toHaveClass("mainTitle");
  });
});
