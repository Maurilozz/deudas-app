export function ShareTarget() {
  const handleClick = async () => {
    const shareData = {
      title: "Deudas App",
      text: "Encontre esta increible app para administrar mejor mis finanzas",
      url: "https://deudasapp.netlify.app/",
    };

    try {
      await navigator.share(shareData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="text-center dark:text-gray-400" onClick={handleClick}>
      Comparte esta app con tus amigos :D
    </button>
  );
}

export default ShareTarget;
