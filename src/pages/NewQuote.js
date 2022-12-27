import { useEffect } from "react";
import { addQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const NewQuote = () => {
  const history = useHistory();
  const [sendRequest, status] = useHttp(addQuote);
  const onAddQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  return <QuoteForm onAddQuote={onAddQuoteHandler} />;
};

export default NewQuote;
