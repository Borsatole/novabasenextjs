
import DarkmodeButton from './darkmodeButton'
import AvatarOptions from './avatarOptions'
import Timer from './timer'
import FullScreenButton from './fullscreen'
import { BtnAbrirMenuLateral } from '../MenuLateral/botoesMenu';
import Tooltip from '../tooltip/tooltipwrapper';



function BarraSuperior() {

  return (
    <nav className="w-full p-4 flex bg-[var(--base-color)]  justify-between items-center b-1 border-b-1 border-[var(--base-variant)] ">
      
          <div>
          <BtnAbrirMenuLateral />
          </div>


        <div className="flex items-center gap-3 justify-center ">

          
          <Timer/>


          
          <Tooltip tooltip="Alternar tela cheia" position="bottom">
            <FullScreenButton />
          </Tooltip>


          <Tooltip tooltip="Alternar tema" position="bottom">
            <DarkmodeButton />
          </Tooltip>

          <AvatarOptions />

          
      

        </div>

        
    </nav>
  )
}

export default BarraSuperior