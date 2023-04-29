import {useState ,useEffect} from "react"

const DebateInformation = ({debateType}) => {


    const [ debateInfo,setDebateInfo] =useState(null)
    useEffect(() => {
      
    
              const deb =   DebateTypeArr.find(deb=>deb.type===debateType)
              setDebateInfo(deb)

    
     
    }, [debateType  ])
    

  return (
    <>
    {
     debateInfo  ?      
        <div className={"debateInformationBox"}>
        
        <b>You choosed {debateInfo.type} type</b>
        <p className="debateInformation_box_desc">{debateInfo.desc}</p>
        
        </div> :""
    }
    </>
        )
}

export default DebateInformation

const DebateTypeArr = [
    {   
        type:"Lincoln–Douglas",
        desc:"This debate  is a  of one-on-one competitive debate . Theres a two side & 1 person per side (1 Affirmative / 1 Negative) . Both side will get the limited time to speak . ",
        timeFormat:[
            {
                Aff:6,
                Both:3,
                Neg:6,
                Both:3,
                Aff:4,
                Neg:6,
                Aff:3
            }
        ]
    },{
        type:"British Parliamentary",
        desc:"This debate is for arguing in favour or against the motion  . There are two teams one team is of Government  and another is opposition of government. Each team can have 2/4 member . ",
    }
]