import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, queryByText, getAllByTestId, getByPlaceholderText, prettyDOM, getByAltText, getByDisplayValue } from "@testing-library/react";


import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const {getByText} = render(<Application />);
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target : {value : "Lydia Miller-Jones"}
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"))
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  
  })

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

  const { container, debug } = render(<Application />);


  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(getByAltText(appointment, "Delete"));
  

  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

  fireEvent.click(getByText(appointment, "Confirm"));

  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  await waitForElement(() => getByAltText(appointment, "Add"));

  const day = getAllByTestId(container, "day").find(day => 
    queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    debug();
    
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
// 1. Render the Application.
const { container, debug } = render(<Application />);

// 2. Wait until the text "Archie Cohen" is displayed.
await waitForElement(() => getByText(container, "Archie Cohen"));
const appointment = getAllByTestId(container, "appointment").find(
  appointment => queryByText(appointment, "Archie Cohen")
  );
// 3. Click the "Edit" button on the booked appointment.
fireEvent.click(getByAltText(appointment, "Edit"));

// 6. Edit the name
fireEvent.change(getByDisplayValue(appointment, /Archie Cohen/i), {
  target : {value : "Edited Name"}
});
// 7. Save the changes
fireEvent.click(getByText(appointment, "Save"))
// 8. Wait until the element with the "Edited Name" is displayed.
await waitForElement(() => queryByText(appointment, "Edited Name"));
// 8. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".
const day = getAllByTestId(container, "day").find(day => 
  queryByText(day, "Monday")
  );
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  // debug();
  })

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => getByAltText(appointment, "Add")
    );

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target : {value : "Lydia Miller-Jones"}
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"))

    await waitForElement(() => queryByText(appointment, "Error"));

    // debug();

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
      axios.delete.mockRejectedValueOnce();

      const { container, debug } = render(<Application />);

      await waitForElement(() => getByText(container, "Archie Cohen"));

      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );

      fireEvent.click(getByAltText(appointment, "Delete"));
      
      expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

      fireEvent.click(getByText(appointment, "Confirm"));

      await waitForElement(() => getByText(appointment, "Error"));


      expect(getByText(appointment, "Error deleting interview")).toBeInTheDocument();

      // debug();
  });
})