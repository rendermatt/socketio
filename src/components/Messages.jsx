const Messages = ({ events }) => {
  console.debug("events:", events);
  return (
    <ul>
      {events.map((event, index) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  );
};

export default Messages;
