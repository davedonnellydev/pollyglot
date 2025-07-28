import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainHeader from "../Header";

describe("Header component", () => {
  it("renders the header element", () => {
    render(<MainHeader />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the image with the correct alt text", () => {
    render(<MainHeader />);
    const imageElement = screen.getByAltText(
      "A brightly coloured cartoon parrot surrounded by stars"
    );
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/parrot.png");
  });

  it("renders the main title and subtitle", () => {
    render(<MainHeader />);
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

  it("renders header with correct styling", () => {
    render(<MainHeader />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass("header");
  });

  it("renders the logo image with correct styling", () => {
    render(<MainHeader />);
    const logo = screen.getByAltText(
      "A brightly coloured cartoon parrot surrounded by stars"
    );
    expect(logo).toHaveClass("logo");
  });

  it("renders the title with correct styling", () => {
    render(<MainHeader />);
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveClass("title");
  });

  it("renders the subtitle with correct styling", () => {
    render(<MainHeader />);
    const subtitle = screen.getByRole("heading", { level: 2 });
    expect(subtitle).toBeInTheDocument();
    // Note: The subtitle is actually a <p> element, not an h2
    const subtitleElement = screen.getByText("Perfect Translation Every Time");
    expect(subtitleElement).toHaveClass("subtitle");
  });

  it("has proper semantic structure", () => {
    render(<MainHeader />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe("HEADER");
  });
});
