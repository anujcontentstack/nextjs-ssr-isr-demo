import {
  useEffect,
  useState,
} from 'react';

export const FeedbackVotes = () => {
  const [data, setData] = useState();
  useEffect(async () => {
    let response = await fetch("http://localhost:3000/api/feedback/votes", {
      method: "GET",
    });

    let data = await response.text();
    console.log(data);
    setData(data);
  }, []);

  return (
    <div>
      <p>FeedbackVotes</p>
      <code>{data}</code>
    </div>
  );
};
export default FeedbackVotes;
