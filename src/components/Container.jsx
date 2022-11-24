export const Container = ({ children }) => { //children viene desde react es parecido al props
  return (
    <div className="container p-4">
      <div className="col-md-4 offset-md-4">{children}</div>
    </div>
  );
};
