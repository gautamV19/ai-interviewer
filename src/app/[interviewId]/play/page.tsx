import {Call} from "@/components/composite/Call";

const Page = ({params}: {params: {interviewId: string}}) => {
    return <Call id={params.interviewId}/>
}

export default Page