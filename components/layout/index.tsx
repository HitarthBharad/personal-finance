// import Header from "./components/header";
import Header from "./header";
import Sidebar from "./sidebar";

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout({
	children
}: LayoutProps): JSX.Element {
	return (
		<>
			<div className="flex flex-grow overflow-y-auto">
				<Sidebar />
				<main className="bg-background-1 flex-grow flex flex-col overflow-y-auto px-4">
					<div>
						{/* <Header /> */}
					</div>
					<div className="flex-grow overflow-y-auto px-4 pb-4">
						{children}
					</div>
				</main>
			</div >
		</>
	);
}
