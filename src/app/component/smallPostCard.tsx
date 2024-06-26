export default function SmallPostCard({post}) {
    return (
        <div className="flex flex-col w-full h-full bg-white rounded-lg shadow-md">
            <div className="flex flex-col w-full h-full">
                <div className="flex w-full h-1/2">
                    <img src={post.image} alt="post image" className="w-full h-full object-cover rounded-t-lg"/>
                </div>
                <div className="flex flex-col w-full h-1/2 p-2">
                    <div className="flex flex-row w-full h-1/2">
                        <p className="text-xs text-gray-400">{post.category}</p>
                    </div>
                    <div className="flex flex-row w-full h-1/2">
                        <p className="text-sm">{post.title}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}