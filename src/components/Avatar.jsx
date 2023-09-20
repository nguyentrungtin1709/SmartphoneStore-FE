import { deepPurple } from '@mui/material/colors'
import Avatar from '@mui/material/Avatar';
import useAccount from "../hooks/useAccount.jsx";
import { classNames } from "../utils/classNames.jsx";

function AccountAvatar({ className }){
    const account = useAccount()
    return (
        <>
            <div className={classNames("flex items-center justify-center", className)}>
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