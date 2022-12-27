import { Fragment, useEffect } from "react";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getSingleQuote, true);

  const { quoteId } = params;
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    <div className="centered">
      <LoadingSpinner />
    </div>;
  }

  if (error) {
    <div className="centered">
      <p>{error}</p>
    </div>;
  }
  if (loadedQuotes.text) {
    return <h1>No Quote found</h1>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comment`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comment`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
