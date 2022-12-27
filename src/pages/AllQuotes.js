import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
  { id: "q1", author: "Akuna", text: "Learning React should be great" },
  {
    id: "q2",
    author: "Aklil",
    text: "Learning React is fun ",
  },
];

const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
