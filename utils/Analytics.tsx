import ReactGA from "react-ga4";

export const initializeAnalytics = () => {
  ReactGA.initialize([
    {
      trackingId: "G-[TRACKING ID]"
    }
  ]);
}

export const GaEvent = (
  event_name:string,
  label:string,
  data?:object
) => {

  let event_params = {
      label,
      ...data
  };

  ReactGA.event(event_name, event_params);
};

// Examples to call function:
// GaEvent("events", "signup_mobile_number", "otp", { state: "success" })
// GaEvent("events", "leaderboard_video", "video_page", {test_userid: userData?._id, video_id: props.id})


export const GaPageview = (route: string , title:string, data?:object) => {
  ReactGA.send({ hitType: "pageview", page: `/${route}`, title: title, ...data });
}
// You can also add any numebr of fields in page view just like its passed in data