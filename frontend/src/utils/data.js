export const AI_OPTIONS = [
    {
        name: "Q&A",
        id: "q&a",
        description: "Answer questions based on existing knowledge",
        option: {
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
    {
        name: "Grammer Correction",
        id: "grammerCorrection",
        description: "Corrects sentences into standard English.",
        option: {
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
    {
        name: "Summarize for a 2nd grader",
        id: "summary",
        description: "Translates difficult text into simpler concepts.",
        option: {
            model: "text-davinci-003",
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
    {
        name: "English to Other languages",
        id: "translate",
        description: "Translates English text into French, Spanish and Japanese.",
        option: {
            model: "text-davinci-003",
            temperature: 0.3,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
    {
        name: "Movie to Emoji",
        id: "movieToEmoji",
        description: "Convert movie titles into emoji.",
        option: {
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
    {
        name: "Explain code",
        id: "explainCode",
        description: "Explain a complicated piece of code.",
        option: {
            model: "code-davinci-002",
            temperature: 0,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
    {
        name: "JavaScript to Python",
        id: "jstopy",
        description: "Convert simple JavaScript expressions into Python.",
        option: {
            model: "code-davinci-002",
            temperature: 0,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        },
    },
];

export const AvatarsImg = [
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar2.png?alt=media&token=4300e22f-ddbb-4705-89f2-be07f874482e",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar3.png?alt=media&token=fa4b4566-e1ec-4992-a4f4-91f96d152994",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar4.png?alt=media&token=aac2026f-9732-4005-b9d8-343a55743b97",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar5.png?alt=media&token=d95afaa1-a672-40ec-afea-68de431bc3fa",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar6.png?alt=media&token=c28fb107-d80b-4611-9561-5042c41ee9f8",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar7.png?alt=media&token=419170d1-3610-4e72-a963-5ee3ef1ec27f",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar8.png?alt=media&token=5e7ed749-bba0-4b76-9986-6673ae8a14c0",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar9.png?alt=media&token=7630503c-9f93-4c1d-8425-b6127bab7dec",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar10.png?alt=media&token=ceb8a9b8-5c07-41fa-b951-969554cf200e",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar11.png?alt=media&token=d825b3ec-64cd-4c31-8369-1f540abcd841",
    "https://firebasestorage.googleapis.com/v0/b/vrumies-1f269.appspot.com/o/avatar12.png?alt=media&token=084eb506-e7d8-40fc-85cc-56fad2932246"
]
export const TimeFormatMappingMethod= (teamsNameArr,format)=>{

    
    let timeMaps =   new Map([
        ["Lincoln–Douglas",[
            { team : teamsNameArr[0], time :6 },
            { team:"both", time :3 },
            { team: teamsNameArr[1], time : 6 },
            { team: "both" , time: 3 },
            { team:  teamsNameArr[0], time : 4 },
            { team:  teamsNameArr[1], time: 6 },
            { team:  teamsNameArr[0], time:3 },
        ]],
        [
            "British Parliamentary",[
                { team : teamsNameArr[0], time :4 },
                { team: teamsNameArr[1], time : 4 },
                { team : teamsNameArr[0], time :4 },
                { team: teamsNameArr[1], time : 4 },
           
            ]
        ],
        [
            "Public forum",[
                { team : teamsNameArr[0], time :4 },
                { team: teamsNameArr[1], time : 4 },
                { team : teamsNameArr[0], time :4 },
                { team: teamsNameArr[1], time : 4 },
           
            ]
        ],
    ])
    
    
    
    return timeMaps.get(format)
    
} 


