import Elgato from './../assets/ElGato_transparent.webp'

const HomePage = () => {
  return (
    <>
      <h1 className="text-center no-pad">NO ELGATO!</h1>
      <div id='elgatoContainer' className='elgatoContainer d-flex justify-content-center'>
        <img id='elgato' className="text-center no-pad elgato" src={Elgato} />
      </div>
    </>
  );
};

export default HomePage;