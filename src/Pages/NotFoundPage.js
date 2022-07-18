const NotFoundPage = () => {
  const styles = {
    color: "#fcb500",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    fontSize:"100px"
  }
  return (
    <main>
      <div className="container">
        <h1 style={styles}>404 <p style={{fontSize:"33px"}}>Not Found Page</p></h1>
      </div>
    </main>
  )
}

export default NotFoundPage