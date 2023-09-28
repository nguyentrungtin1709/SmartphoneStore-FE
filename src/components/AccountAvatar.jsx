import { deepPurple } from '@mui/material/colors'
import Avatar from '@mui/material/Avatar';
import useAccount from "../hooks/useAccount.jsx";
import { classNames } from "../utils/classNames.jsx";

function AccountAvatar({ className, sx }){
    const size = sx || 40
    const account = useAccount()
    return (
        <>
            <div className={classNames("flex items-center justify-center", className)}>
                {
                    account?.imageUrl == null ?
                    <Avatar
                        sx={{
                            bgcolor: deepPurple[500],
                            width: size,
                            height: size
                        }}
                    >
                        {account?.name[0]}
                    </Avatar> :
                    <Avatar
                        alt="Avatar"
                        src={account.imageUrl}
                        sx={{
                            width: size,
                            height: size
                        }}
                    />
                }
            </div>
        </>
    )
}

export default AccountAvatar