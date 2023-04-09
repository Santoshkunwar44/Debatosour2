import styled from "styled-components";


export const CreateDebateWrapper = styled.div`

width: 100%;
display:flex;
flex-direction: column;
gap: 1rem;
padding-bottom: 1rem;
.participants_list{
    display: flex;
    flex-direction:column;
    margin-top: 10px;
    gap: 10px;
    height: auto;
    max-height: 300px;
    overflow-y: scroll;
    text-align: center;

}


input{
            height: 40px;
            width:100%;
            border-radius: 4px;
            font-size: 12px;
            padding-left: 8px;
            outline: none;
            letter-spacing: 1px;
            border: none;
            color:rgb(101 112 124);
            background-color: #EFF3F6;
            /* box-shadow: 0px 0px 2px rgb(64, 70, 221); */
            ::placeholder{
                font-size: 12px;
                letter-spacing: 0.8px;
                color: rgb(118 118 118 / 73%);
            

            }

}
.form_input_row_box{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap:10px;

    .starting_time_item_box{
        display: flex;
        gap: 10px;
        .starting_time_item{
            .duration_input{
                display: flex;
                gap: 10px;
                height: 40px;
                .time_box{
                    background-color: #EFF3F6;
                    display: flex;
                    align-items: center;
                }
                input{
                    height: 90%;


                }
                div{
                    padding: 0 5px;
                    color: grey;
                    font-size: 10px;
                }
            }
            flex:1;
        }
    }
}
.lable_row{
    display: flex;
    justify-content: space-between;

    span{
        font-size: 10px;
        color: rgb(64, 70, 221);;

    }
    .form_label{
        font-size: 12px;
        letter-spacing: 1px;
        color: grey;
        margin-bottom: 5px;
        display: block;
        
    }
}
.create_debate_btn{
    background-color: rgb(64, 70, 221);
    height: 40px;
    width: fit-content;

    align-self: flex-end;
    border-radius: 5px;
    padding: 0 1rem;
    color: white;
    font-size: 12px;
    letter-spacing: 1px;
    :hover{
        background-color:  rgb(26 33 201);
    }
}
`