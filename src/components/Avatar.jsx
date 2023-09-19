import { deepOrange, deepPurple } from '@mui/material/colors'
import Avatar from '@mui/material/Avatar';
import useAccount from "../hooks/useAccount.jsx";

function AccountAvatar(){
    const account = useAccount()
    return (
        <>
            <div className="flex items-center justify-center px-5 py-5 h-2.5 w-2.5
            rounded-full bg-stone-700">
                {
                    account.imageUrl == null ?
                    <Avatar
                        sx={{
                            bgcolor: deepPurple[500]
                        }}
                    >
                        {account.name[0]}
                    </Avatar> :
                    <Avatar alt="Avatar" src={account.imageUrl}/>
                }
            </div>
        </>
    )
}

export default AccountAvatar