import Image from 'next/image';
import './Navbar.css';

function Navbar() {
    return (
        <>
            <div className="Navbar">
                {/* logo container */}
                <div className="logo-container">
                    {/* logo img */}
                    <Image
                        src="/images/troll-face.png"
                        alt="Logo troll face"
                        className="logo-img"
                        width={32}
                        height={32}
                    />
                    {/* logo text */}
                    <div className="logo-text">
                        <p>Meme Generator</p>
                    </div>
                </div>

                {/* other text */}
                <div className="other-text">
                    <p>React Course - Project 3</p>
                </div>
            </div>
        </>
    );
}
export default Navbar;
