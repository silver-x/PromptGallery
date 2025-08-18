'use client'

import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  Text,
  Avatar,
  useDisclosure,
  IconButton,
  VStack,
  CloseButton,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavLink = ({ href, children, isActive }: NavLinkProps) => (
  <Link
    as={NextLink}
    href={href}
    px={3}
    py={2}
    rounded="md"
    color={isActive ? 'brand.500' : 'white'}
    textDecoration="none"
    position="relative"
    transition="all 0.3s ease"
    _hover={{
      color: 'brand.500',
      textShadow: '0 0 10px #00ffff',
      transform: 'translateY(-1px)',
    }}
    _after={{
      content: '""',
      position: 'absolute',
      bottom: '-5px',
      left: 0,
      width: isActive ? '100%' : '0',
      height: '2px',
      background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
      transition: 'width 0.3s ease',
    }}
    sx={{
      '&:hover::after': {
        width: '100%',
      },
    }}
  >
    {children}
  </Link>
);

interface User {
  id: string;
  username: string;
  avatar?: string;
}

interface NavbarProps {
  user?: User | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

export default function Navbar({ user, onLogin, onLogout }: NavbarProps) {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/search', label: '搜索发现' },
    { href: '/community', label: '社区' },
  ];

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      width="100%"
      zIndex={1000}
      background={scrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.9)'}
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor="rgba(0, 255, 255, 0.3)"
      transition="all 0.3s ease"
      boxShadow={scrolled ? '0 4px 20px rgba(0, 255, 255, 0.1)' : 'none'}
    >
      <Flex
        maxW="1400px"
        mx="auto"
        px={8}
        py={4}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <Link
          as={NextLink}
          href="/"
          fontSize="xl"
          fontWeight="bold"
          className="gradient-text"
          textDecoration="none"
          _hover={{
            transform: 'scale(1.05)',
            filter: 'drop-shadow(0 0 10px #00ffff)',
          }}
          transition="all 0.3s ease"
        >
          PromptGallery
        </Link>

        {/* Desktop Navigation */}
        <HStack as="nav" spacing={8} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              isActive={pathname === link.href}
            >
              {link.label}
            </NavLink>
          ))}
        </HStack>

        {/* User Actions */}
        <HStack spacing={4}>
          {user ? (
            <HStack spacing={3}>
              <Avatar
                size="sm"
                name={user.username}
                src={user.avatar}
                border="2px solid"
                borderColor="brand.500"
                _hover={{
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
                }}
                transition="all 0.3s ease"
              />
              <Button
                variant="ghost"
                size="sm"
                color="brand.500"
                onClick={onLogout}
                _hover={{
                  bg: 'rgba(0, 255, 255, 0.1)',
                }}
              >
                退出
              </Button>
            </HStack>
          ) : (
            <HStack spacing={3} display={{ base: 'none', sm: 'flex' }}>
              <Button
                as={NextLink}
                href="/login"
                variant="outline"
                size="sm"
                borderColor="brand.500"
                color="brand.500"
                _hover={{
                  bg: 'rgba(0, 255, 255, 0.1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 15px rgba(0, 255, 255, 0.3)',
                }}
                transition="all 0.3s ease"
              >
                登录
              </Button>
              <Button
                as={NextLink}
                href="/register"
                bg="linear-gradient(45deg, #00ffff, #ff00ff)"
                color="black"
                fontWeight="bold"
                size="sm"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 15px rgba(0, 255, 255, 0.4)',
                }}
                transition="all 0.3s ease"
              >
                注册
              </Button>
            </HStack>
          )}

          {/* Mobile menu button */}
          <IconButton
            aria-label="打开菜单"
            icon={<FiMenu />}
            variant="ghost"
            color="brand.500"
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            _hover={{
              bg: 'rgba(0, 255, 255, 0.1)',
              transform: 'scale(1.1)',
            }}
          />
        </HStack>
      </Flex>

      {/* Mobile Navigation - Simplified */}
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="rgba(0, 0, 0, 0.95)"
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor="rgba(0, 255, 255, 0.3)"
          borderTop="none"
          display={{ base: 'block', md: 'none' }}
          zIndex={1000}
        >
          <VStack spacing={4} p={6} align="stretch">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                as={NextLink}
                href={link.href}
                onClick={onClose}
                p={3}
                rounded="md"
                color={pathname === link.href ? 'brand.500' : 'white'}
                bg={pathname === link.href ? 'rgba(0, 255, 255, 0.1)' : 'transparent'}
                textDecoration="none"
                _hover={{
                  bg: 'rgba(0, 255, 255, 0.1)',
                  color: 'brand.500',
                }}
                transition="all 0.3s ease"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile User Actions */}
            {user ? (
              <VStack spacing={4} pt={4}>
                <HStack>
                  <Avatar size="sm" src={user.avatar} name={user.username} />
                  <Text color="white">{user.username}</Text>
                </HStack>
                <Button
                  onClick={() => {
                    onLogout?.();
                    onClose();
                  }}
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                  w="full"
                >
                  退出登录
                </Button>
              </VStack>
            ) : (
              <VStack spacing={4} pt={4}>
                <Button
                  as={NextLink}
                  href="/login"
                  onClick={onClose}
                  variant="outline"
                  borderColor="brand.500"
                  color="brand.500"
                  size="sm"
                  w="full"
                  _hover={{
                    bg: 'rgba(0, 255, 255, 0.1)',
                    borderColor: 'brand.400',
                  }}
                >
                  登录
                </Button>
                <Button
                  as={NextLink}
                  href="/register"
                  onClick={onClose}
                  bg="linear-gradient(45deg, #00ffff, #ff00ff)"
                  color="white"
                  size="sm"
                  w="full"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0, 255, 255, 0.3)',
                  }}
                >
                  注册
                </Button>
              </VStack>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
}