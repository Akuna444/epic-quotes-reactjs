import { Fragment } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";

const DUMMY_QUOTES = [
  { id: "q1", author: "Akuna", text: "Learning React should be great" },
  {
    id: "q2",
    author: "Aklil",
    text: "Learning React is fun ",
  },
];

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  console.log(match);
  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
  if (!quote) {
    return <h1>No Quote found</h1>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
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
