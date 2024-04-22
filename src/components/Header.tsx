import LogoImage from "../assets/images/LogoImage.svg"
const Header = () => {
  return (
    <div className='w-full h-[200px] bg-[#0D0D0D] flex flex-row justify-center items-center'>
      <img src={LogoImage} alt="Logo" className="mr-2" />
      <h1 className='text-[40px] text-[#4EA8DE] font-black'>to</h1>
      <h1 className='text-[40px] text-[#5E60CE] font-black'>do</h1>
    </div>
  )
}

export default Header