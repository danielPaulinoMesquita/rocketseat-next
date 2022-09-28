import styles from './styles.module.scss';
import {signIn, useSession} from "next-auth/react";

interface SubscribeButtonProps {
    priceId: number;
}

export function SubscribeButton({priceId}: SubscribeButtonProps){
    const [session] = useSession();

    function handleSubscribe() {
        if (!session){
            signIn('github');
            return;
        }
    }

    return (
        <button
        type="button"
        className={styles.subscribeButton}>
            Subscribe now
        </button>
    )
}