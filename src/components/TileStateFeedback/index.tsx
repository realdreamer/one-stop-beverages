import React from 'react';

interface Props {
  loading?: Boolean;
  error: any | null;
  empty?: Boolean;
}

export default function TileStateFeedback({
  loading,
  error,
  empty,
  children,
}: React.PropsWithChildren<Props>): React.ReactElement | null {
  if (loading) {
    return <p>Loading...!</p>;
  }

  if (error) return <p>Something went wrong..! Please try again sometime!</p>;

  if (empty) {
    return <p>No Data at the moment..!</p>;
  }

  if (children) return <>{children}</>;

  return null;
}
