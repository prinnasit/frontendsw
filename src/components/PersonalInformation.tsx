export default function PersonalInformation({name,phone,email}:{name:string,phone:string,email:string}){
    return(
    <div className="rounded-lg border-2 border-slate-300 p-7">
        <div className="font-semibold text-2xl mb-3">Personal Information --------------------- </div>
        <div className="font-medium text-xl">Name : {name}</div>
        <div className="font-medium text-xl">Age :                  20</div> 
        <div className="font-medium text-xl">Sex :                  Male</div>
        <div className="font-medium text-xl">Phone Number :         {phone}</div>
        <div className="font-medium text-xl">Email :                {email}</div>
    </div>
    );
}