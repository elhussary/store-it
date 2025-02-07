'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from './ui/separator';
import { navItems } from '@/constants';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { signOutUser } from '@/lib/actions/user.actions';
import FileUploader from './FileUploader';

interface MobileNavigationProps {
	$id: string;
	accountId: string;
	fullName: string;
	avatar: string;
	email: string;
}

const MobileNavigation = ({ $id: ownerId, accountId, fullName, avatar, email }: MobileNavigationProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<header className="mobile-header">
			<Image src={'assets/icons/logo-full-brand.svg'} alt="logo" width={120} height={120} className="h-auto" />

			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger>
					<Image src={'assets/icons/menu.svg'} alt="Search" width={30} height={30} />
				</SheetTrigger>
				<SheetContent className="shat-sheet h-screen px-3">
					<SheetTitle>
						<div className="header-user">
							<Image src={avatar} alt="avatar" width={44} height={44} className="header-user-avatar" />

							<div className="sm:hidden lg:block">
								<p className="subtitle-2 capitalize">{fullName}</p>
								<p className="caption">{email}</p>
							</div>
						</div>
						<Separator className="mb-4 bg-light-200/20" />
					</SheetTitle>

					<nav className="mobile-nav">
						<ul className="mobile-nav-list">
							{navItems.map(({ name, icon, url }) => {
								return (
									<Link key={name} href={url} className="lg:w-full">
										<li className={cn('mobile-nav-item', pathname === url && 'shad-active')}>
											<Image
												src={icon}
												alt={name}
												width={24}
												height={24}
												className={cn('nav-icon', pathname === url && 'nav-icon-active')}
											/>
											<p>{name}</p>
										</li>
									</Link>
								);
							})}
						</ul>
					</nav>

					<Separator className="my-5 bg-light-200/20" />

					<div className="flex flex-col justify-between gap-5">
						<FileUploader ownerId={ownerId} accountId={accountId} />

						<Button type="submit" className="mobile-sign-out-button" onClick={async () => signOutUser()}>
							<Image src={'/assets/icons/logout.svg'} alt="logo" width={24} height={24} />
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</header>
	);
};

export default MobileNavigation;
