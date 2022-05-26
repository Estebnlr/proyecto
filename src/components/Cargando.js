export default function Cargando() {
    return (
      <div
        style={{
          position:"fixed",
          top:"0",
          left:"0",
          width:"100vw",
          height:"100vh",
          zIndex:"99",
          backgroundColor:"white",
        }}
      >
        <i className="fa-solid fa-spinner fa-spin-pulse fa-6x" style={{
          color:'#198754',
          position:'absolute',
          top:"calc(50% - 50px)",
          left:"calc(50% - 50px)"
        }}/>
      </div>
    )
  }