import { cn } from "@/lib/utils";
import { Button } from "../ui/button"

type Props = React.ComponentProps<typeof Button>;

export const ButtonPrimary = ({className, children, ...props}: Props) => {
    return (
        <Button
            className={cn("bg-blue-600 hover:bg-blue-500 cursor-pointer", className)}
            {...props}
        >
            {children}
        </Button>
    )
}
