import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (   //Recat.forwardref to allow access parant componant to Ref
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props} />   // cn() helps to merge custom classes
))
Avatar.displayName = AvatarPrimitive.Root.displayName  //for debugging

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image     //for avtar image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}   //aspect-square = 1:1 ratio
    {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName  //for debugging

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback       //Fallback when image faild to load
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props} />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }   // export component
