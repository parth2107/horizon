import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link"
import { Button } from "./ui/button"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";

const PlaidLink = ({ user, varient }: PlaidLinkProps) => {

	const router = useRouter();
	const [token, setToken] = useState('');

	useEffect(() => {
		const getLinkToken = async () => {
			const data = await createLinkToken(user);
			setToken(data?.linkToken);
		}
		getLinkToken();
	}, [user]);
	
	const onSuccess = useCallback(async (public_token: string) => {
		await exchangePublicToken({
			publicToken: public_token,
			user,
		});

		router.push('/');
	}, [user]);

	const config: PlaidLinkOptions = {
		token,
		onSuccess
	}

	const {open, ready} = usePlaidLink(config);

  return (
    <>
    {varient === 'primary' ? (
        <Button
					onClick={() => open}
					disabled={!ready}
					className="plaidlink-primary"
				>
          Connect bank
        </Button>
    ): varient === 'ghost' ? (
        <Button>
        	Connect bank
        </Button>
    ): (
        <Button>
          Connect bank
        </Button>
    )}  
    </>
  )
}

export default PlaidLink
