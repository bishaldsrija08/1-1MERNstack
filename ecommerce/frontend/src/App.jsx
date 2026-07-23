// const App = () => {
//   return (
//     <div>
// <nav className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
//   <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//     <div className="relative flex h-16 items-center justify-between">
//       <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//         <button type="button" command="--toggle" commandfor="mobile-menu" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
//           <span className="absolute -inset-0.5" />
//           <span className="sr-only">Open main menu</span>
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 in-aria-expanded:hidden">
//             <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 not-in-aria-expanded:hidden">
//             <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </button>
//       </div>
//       <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//         <div className="flex shrink-0 items-center">
//           <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="h-8 w-auto" />
//         </div>
//         <div className="hidden sm:ml-6 sm:block">
//           <div className="flex space-x-4">
//             <a href="#" aria-current="page" className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white">Dashboard</a>
//             <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">Team</a>
//             <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">Projects</a>
//             <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">Calendar</a>
//           </div>
//         </div>
//       </div>
//       <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//         <button type="button" className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
//           <span className="absolute -inset-1.5" />
//           <span className="sr-only">View notifications</span>
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
//             <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </button>
//         <el-dropdown className="relative ml-3">
//           <button className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
//             <span className="absolute -inset-1.5" />
//             <span className="sr-only">Open user menu</span>
//             <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" />
//           </button>
//           <el-menu anchor="bottom end" popover className="w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
//             <a href="#" className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden">Your profile</a>
//             <a href="#" className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden">Settings</a>
//             <a href="#" className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden">Sign out</a>
//           </el-menu>
//         </el-dropdown>
//       </div>
//     </div>
//   </div>
//   <el-disclosure id="mobile-menu" hidden className="block sm:hidden">
//     <div className="space-y-1 px-2 pt-2 pb-3">
//       <a href="#" aria-current="page" className="block rounded-md bg-gray-950/50 px-3 py-2 text-base font-medium text-white">Dashboard</a>
//       <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Team</a>
//       <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Projects</a>
//       <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Calendar</a>
//     </div>
//   </el-disclosure>
// </nav>

// <div className="relative isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
//   <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
//     <div style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}} className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20" />
//   </div>
//   <div className="mx-auto max-w-4xl text-center">
//     <h2 className="text-base/7 font-semibold text-indigo-400">Pricing</h2>
//     <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl">Choose the right plan for you</p>
//   </div>
//   <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.</p>
//   <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
//     <div className="rounded-3xl rounded-t-3xl bg-white/2.5 p-8 ring-1 ring-white/10 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-tr-none lg:rounded-bl-3xl">
//       <h3 id="tier-hobby" className="text-base/7 font-semibold text-indigo-400">Hobby</h3>
//       <p className="mt-4 flex items-baseline gap-x-2">
//         <span className="text-5xl font-semibold tracking-tight text-white">$29</span>
//         <span className="text-base text-gray-400">/month</span>
//       </p>
//       <p className="mt-6 text-base/7 text-gray-300">The perfect plan if you're just getting started with our product.</p>
//       <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10">
//         <li className="flex gap-x-3">
//           <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
//             <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" fillRule="evenodd" />
//           </svg>
//           25 products
//         </li>
//         <li className="flex gap-x-3">
//           <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
//             <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" fillRule="evenodd" />
//           </svg>
//           Up to 10,000 subscribers
//         </li>
//         <li className="flex gap-x-3">
//           <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
//             <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" fillRule="evenodd" />
//           </svg>
//           Advanced analytics
//         </li>
//         <li className="flex gap-x-3">
//           <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
//             <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" fillRule="evenodd" />
//           </svg>
//           24-hour support response time
//         </li>
//       </ul>
//       <a href="#" aria-describedby="tier-hobby" className="mt-8 block rounded-md bg-white/10 px-3.5 py-2.5 text-center text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/75 sm:mt-10">Get started today</a>
//     </div>
//     <div className="relative rounded-3xl bg-gray-800 p-8 ring-1 ring-white/10 sm:p-10">
//       <h3 id="tier-enterprise" className="text-base/7 font-semibold text-indigo-400">Enterprise</h3>
//       <p className="mt-4 flex items-baseline gap-x-2">
//         <span className="text-5xl font-semibold tracking-tight text-white">$99</span>
//         <span className="text-base text-gray-400">/month</span>
//       </p>
//       <p className="mt-6 text-base/7 text-gray-300">Dedicated support and infrastructure for your company.</p>
//       <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10">
//         <li className="flex gap-x-3">
//           <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
//             <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" fillRule="evenodd" />
//           </svg>
//           Unlimited products
//         </li>
//         <li className="flex gap-x-3">
//           <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
//             <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" fillRule="evenodd" />
//           </svg>
//           Unlimited subscribers
//         </li>
//         <li className="flex gap-x-3">
//           <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
//             <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" fillRule="evenodd" />
//           </svg>
//           Advanced analytics
//         </li>
//         <li className="flex gap-x-3">
//           <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
//             <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" fillRule="evenodd" />
//           </svg>
//           Dedicated support representative
//         </li>
//         <li className="flex gap-x-3">
//           <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
//             <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" fillRule="evenodd" />
//           </svg>
//           Marketing automations
//         </li>
//         <li className="flex gap-x-3">
//           <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400">
//             <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" fillRule="evenodd" />
//           </svg>
//           Custom integrations
//         </li>
//       </ul>
//       <a href="#" aria-describedby="tier-enterprise" className="mt-8 block rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mt-10">Get started today</a>
//     </div>
//   </div>
// </div>

// <div className="bg-gray-900">
//   <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
//     <div className="relative isolate overflow-hidden bg-gray-800 px-6 pt-16 after:pointer-events-none after:absolute after:inset-0 after:inset-ring after:inset-ring-white/10 sm:rounded-3xl sm:px-16 after:sm:rounded-3xl md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
//       <svg viewBox="0 0 1024 1024" aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0">
//         <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
//         <defs>
//           <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
//             <stop stopColor="#7775D6" />
//             <stop offset={1} stopColor="#E935C1" />
//           </radialGradient>
//         </defs>
//       </svg>
//       <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
//         <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">Boost your productivity. Start using our app today.</h2>
//         <p className="mt-6 text-lg/8 text-pretty text-gray-300">Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.</p>
//         <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
//           <a href="#" className="rounded-md bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"> Get started </a>
//           <a href="#" className="text-sm/6 font-semibold text-white hover:text-gray-100">
//             Learn more
//             <span aria-hidden="true">→</span>
//           </a>
//         </div>
//       </div>
//       <div className="relative mt-16 h-80 lg:mt-8">
//         <img width={1824} height={1080} src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png" alt="App screenshot" className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10" />
//       </div>
//     </div>
//   </div>
// </div>

// <div className="bg-gray-900 py-24 sm:py-32">
//   <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
//     <div className="max-w-xl">
//       <h2 className="text-3xl font-semibold tracking-tight text-pretty text-white sm:text-4xl">Meet our leadership</h2>
//       <p className="mt-6 text-lg/8 text-gray-400">We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.</p>
//     </div>
//     <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
//       <li>
//         <div className="flex items-center gap-x-6">
//           <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt className="size-16 rounded-full outline-1 -outline-offset-1 outline-white/10" />
//           <div>
//             <h3 className="text-base/7 font-semibold tracking-tight text-white">Leslie Alexander</h3>
//             <p className="text-sm/6 font-semibold text-indigo-400">Co-Founder / CEO</p>
//           </div>
//         </div>
//       </li>
//       <li>
//         <div className="flex items-center gap-x-6">
//           <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt className="size-16 rounded-full outline-1 -outline-offset-1 outline-white/10" />
//           <div>
//             <h3 className="text-base/7 font-semibold tracking-tight text-white">Michael Foster</h3>
//             <p className="text-sm/6 font-semibold text-indigo-400">Co-Founder / CTO</p>
//           </div>
//         </div>
//       </li>
//       <li>
//         <div className="flex items-center gap-x-6">
//           <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt className="size-16 rounded-full outline-1 -outline-offset-1 outline-white/10" />
//           <div>
//             <h3 className="text-base/7 font-semibold tracking-tight text-white">Dries Vincent</h3>
//             <p className="text-sm/6 font-semibold text-indigo-400">Business Relations</p>
//           </div>
//         </div>
//       </li>
//       <li>
//         <div className="flex items-center gap-x-6">
//           <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt className="size-16 rounded-full outline-1 -outline-offset-1 outline-white/10" />
//           <div>
//             <h3 className="text-base/7 font-semibold tracking-tight text-white">Lindsay Walton</h3>
//             <p className="text-sm/6 font-semibold text-indigo-400">Front-end Developer</p>
//           </div>
//         </div>
//       </li>
//       <li>
//         <div className="flex items-center gap-x-6">
//           <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt className="size-16 rounded-full outline-1 -outline-offset-1 outline-white/10" />
//           <div>
//             <h3 className="text-base/7 font-semibold tracking-tight text-white">Courtney Henry</h3>
//             <p className="text-sm/6 font-semibold text-indigo-400">Designer</p>
//           </div>
//         </div>
//       </li>
//       <li>
//         <div className="flex items-center gap-x-6">
//           <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt className="size-16 rounded-full outline-1 -outline-offset-1 outline-white/10" />
//           <div>
//             <h3 className="text-base/7 font-semibold tracking-tight text-white">Tom Cook</h3>
//             <p className="text-sm/6 font-semibold text-indigo-400">Director of Product</p>
//           </div>
//         </div>
//       </li>
//     </ul>
//   </div>
// </div>


//     </div>
//   )
// }

// export default App


const posts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
    date: "Mar 16, 2020",
    category: "Marketing",
    title: "Boost your conversion rate",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo.",
    author: "Michael Foster",
    role: "Co-Founder / CTO",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    date: "Mar 10, 2020",
    category: "Sales",
    title: "How to use search engine optimization to drive sales",
    description:
      "Optio cum necessitatibus dolor voluptatum provident commodi et.",
    author: "Lindsay Walton",
    role: "Front-end Developer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
    date: "Feb 12, 2020",
    category: "Business",
    title: "Improve your customer experience",
    description:
      "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus.",
    author: "Tom Cook",
    role: "Director of Product",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-slate-900 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            From the blog
          </h2>

          <p className="mt-4 text-lg text-gray-300">
            Learn how to grow your business with our expert advice.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-2xl"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="pt-6">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">{post.date}</span>

                  <span className="rounded-full bg-slate-800 px-4 py-1 text-white">
                    {post.category}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-bold leading-snug text-white transition group-hover:text-indigo-400">
                  {post.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-400">
                  {post.description}
                </p>

                {/* Author */}
                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold text-white">
                      {post.author}
                    </h4>

                    <p className="text-gray-400">{post.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}