import React from "react";

export const Loading = ({ size = "md", text = "Loading...", overlay = false }) => {
    const sizeClasses = {
        sm: "w-4 h-4 border-2",
        md: "w-10 h-10 border-4",
        lg: "w-16 h-16 border-4",
    };

    const textSizeClasses = {
        sm: "text-[10px]",
        md: "text-sm",
        lg: "text-base",
    };

    const content = (
        <div className="flex flex-col items-center gap-3">
            <div
                className={`${sizeClasses[size]} border-gray-200 border-t-green-500 rounded-full animate-spin`}
            />
            {text && (
                <p className={`${textSizeClasses[size]} text-gray-500 font-medium`}>
                    {text}
                </p>
            )}
        </div>
    );

    if (overlay) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return <div className="flex items-center justify-center py-6">{content}</div>;
};