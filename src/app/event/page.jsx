"use client";

// import { useState } from "react"

import EventPageTemplate from "@/components/CreateEvent/EventPageTemplate.jsx";
import { useEffect, useState } from "react";
import axios from '@/components/axios'

export default function CreateEvent() {

  const [resData, setResData] = useState({})
  const {
    location,
    meet_link,
    fb_link,
    ig_link,
    yt_link,
    twitter_link,
    website_link,
    misc_link,
    registration_start_date,
    registration_end_date,
    date,
    category,
    name,
    description,
  } = resData

  const links = {
    facebook: fb_link,
    twitter: twitter_link,
    instagram: ig_link,
    website: website_link,
    misc: misc_link,
    meet: meet_link,
    youtube: yt_link,
  }
  const dates = {
    event_start_date: date,
    event_end_date: '',
    registration_start_date,
    registration_end_date,
  }

  useEffect(() => {
    // axios.get('event')
    // .then((res) => setResData(...res.data))
    // .catch((err) => {
    //   if(err.response) console.log(err)
    // })
  }, [])

  return (
    <>
      <EventPageTemplate
        data={description}
        eventName={name}
        links={links}
        dates={dates}
        sponsors={[]}
        venue={location}
        category={category}
      />
    </>
  );
}
