"use client";

import EventPageTemplate from "@/components/CreateEvent/EventPageTemplate.jsx";
import { useEffect, useState } from "react";
import axios from '@/components/axios'
import { useEvent } from "@/context/EventContext";

export default function CreateEvent() {
  const {event} = useEvent()
  const [resData, setResData] = useState(null)
  const {
    location,
    meet_link,
    fb_link,
    ig_link,
    yt_link,
    twitter_link,
    website_links,
    misc_links,
    registration_start_date,
    registration_end_date,
    date,
    category,
    name,
    description,
    ...data
  } = resData ?? {}

  const links = {
    facebook: fb_link,
    twitter: twitter_link,
    instagram: ig_link,
    website: website_links,
    misc: misc_links,
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
    axios.get(`events/${event?.id}`)
    .then((res) => setResData(res.data))
    .catch((err) => {
      if(err.response) console.log(err)
    })
  }, [event])

  if (resData) {
      return (
        <>
          <EventPageTemplate
            data={description}
            eventName={name}
            links={links}
            dates={dates}
            venue={location}
            category={category.id}
            {...data}
          />
        </>
      );
  }
}
