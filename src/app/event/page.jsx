"use client";

// import { useState } from "react"

import EventPageTemplate from "@/components/CreateEvent/EventPageTemplate.jsx";

export default function CreateEvent() {
  const value = `# About Something
Yo manish check this out, this is MD rendered on jsx. It's working
  
# Rules and guidelines
- hui 
- hui hui
- hui hui hui
- more hui hui
  - why why
    - Hellooo this is the third level of an ul
  - Second level again

1. hello this is an ol`;

  return (
    <>
      <EventPageTemplate
        data={value}
        title={"Cryptic Hunt"}
        subtitle={"A hybrid treasure hunt"}
      />
    </>
  );
}
