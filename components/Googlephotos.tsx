import Image from "next/image"
import React from "react"
import { useTranslation } from 'next-i18next';

const GooglePhotos = ({link}:{link:string}) => {
  const { t } = useTranslation('common');
    return <div className="w-full flex justify-center">
         <a href={link} className="w-fit px-5 flex bg-white rounded-xl p-2 justify-center items-center gap-3">
        <Image alt="Google Photos Logo" src={"/img/logo.png"} width={40} height={40}></Image>
        <div style={{textShadow:"none"}} className="text-2xl text-black font-google">{t("googlephotosKnop")}</div>
    </a>
    </div>
}
export default GooglePhotos