'use client'

import {
  Box,
  Container,
  Card,

  VStack,
  HStack,
  Heading,
  Text,
  Input,
  InputGroup,
  Icon,
  Button,
  Field,
  Checkbox,
  Link,
  Separator,
  IconButton,

  Tabs,
} from '@chakra-ui/react';
import { FaGoogle, FaGithub, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import NextLink from 'next/link';
import { useState } from 'react';
import { useFormValidation } from '@/hooks';
import { toaster } from '@/components/ui/toaster';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const loginValidationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '请输入有效的邮箱地址',
  },
  password: {
    required: true,
    minLength: 6,
    message: '密码至少需要6个字符',
  },
};

const registerValidationRules = {
  username: {
    required: true,
    minLength: 2,
    message: '用户名至少需要2个字符',
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '请输入有效的邮箱地址',
  },
  password: {
    required: true,
    minLength: 8,
    message: '密码至少需要8个字符',
  },
  confirmPassword: {
    required: true,
    message: '请确认密码',
  },
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const {
    values: loginValues,
    errors: loginErrors,
    handleChange: handleLoginChange,
    handleSubmit: handleLoginSubmit,
    isValid: isLoginValid,
  } = useFormValidation<LoginFormData>(
    { email: '', password: '', rememberMe: false },
    loginValidationRules
  );

  const {
    values: registerValues,
    errors: registerErrors,
    handleChange: handleRegisterChange,
    handleSubmit: handleRegisterSubmit,
    isValid: isRegisterValid,
  } = useFormValidation<RegisterFormData>(
    { username: '', email: '', password: '', confirmPassword: '', agreeToTerms: false },
    registerValidationRules
  );

  const onLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // TODO: 实现登录逻辑
      console.log('Login data:', data);
      toaster.create({
        title: '登录成功',
        description: '欢迎回来！',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toaster.create({
        title: '登录失败',
        description: '请检查您的邮箱和密码',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: '密码不匹配',
        description: '请确保两次输入的密码相同',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!data.agreeToTerms) {
      toast({
        title: '请同意服务条款',
        description: '您需要同意我们的服务条款才能注册',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: 实现注册逻辑
      console.log('Register data:', data);
      toast({
        title: '注册成功',
        description: '欢迎加入PromptGallery！',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: '注册失败',
        description: '请稍后重试',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toaster.create({
      title: `${provider} 登录`,
      description: '功能开发中...',
      status: 'info',
      duration: 2000,
    });
  };

  return (
    <Box minH="100vh" position="relative" overflow="hidden">
      {/* 背景动画效果 */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background={
          'radial-gradient(circle at 30% 70%, rgba(0, 255, 255, 0.15) 0%, transparent 50%), ' +
          'radial-gradient(circle at 70% 30%, rgba(255, 0, 255, 0.15) 0%, transparent 50%)'
        }
        animation="backgroundPulse 10s ease-in-out infinite"
        zIndex={-1}
      />

      <Container maxW="md" py={8}>
        <VStack spacing={8}>
          {/* 返回首页按钮 */}
          <HStack w="100%" justify="flex-start">
            <IconButton
              as={NextLink}
              href="/"
              aria-label="返回首页"
              icon={<FaArrowLeft />}
              variant="ghost"
              color="gray.400"
              _hover={{
                color: 'brand.500',
                transform: 'translateX(-2px)',
              }}
            />
          </HStack>

          {/* 标题 */}
          <VStack spacing={2} textAlign="center">
            <Heading className="gradient-text" size="xl">
              PromptGallery
            </Heading>
            <Text color="gray.400" fontSize="lg">
              探索AI的无限可能
            </Text>
          </VStack>

          {/* 登录/注册表单 */}
          <Card.Root className="glass-effect" w="100%" maxW="400px">
            <Card.Body p={8}>
              <Tabs.Root variant="subtle" defaultValue="login">
                <Tabs.List mb={6}>
                  <Tabs.Trigger
                    value="login"
                    flex={1}
                    _selected={{
                      bg: 'rgba(0, 255, 255, 0.2)',
                      color: 'brand.500',
                    }}
                  >
                    登录
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="register"
                    flex={1}
                    _selected={{
                      bg: 'rgba(0, 255, 255, 0.2)',
                      color: 'brand.500',
                    }}
                  >
                    注册
                  </Tabs.Trigger>
                </Tabs.List>

                {/* 登录面板 */}
                <Tabs.Content value="login" p={0}>
                    <VStack spacing={6}>
                      <form
                        onSubmit={handleLoginSubmit(onLoginSubmit)}
                        style={{ width: '100%' }}
                      >
                        <VStack spacing={4}>
                          <Field.Root invalid={!!loginErrors.email}>
                            <Field.Label color="gray.300">邮箱</Field.Label>
                            <InputGroup startElement={<Icon as={FaEnvelope} color="gray.400" />}>
                              <Input
                                type="email"
                                placeholder="请输入邮箱"
                                value={loginValues.email}
                                onChange={(e) => handleLoginChange('email', e.target.value)}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.1)"
                                _hover={{
                                  borderColor: 'brand.500',
                                }}
                                _focus={{
                                  borderColor: 'brand.500',
                                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                                }}
                                color="white"
                                _placeholder={{ color: 'gray.400' }}
                              />
                            </InputGroup>
                            <Field.ErrorText>{loginErrors.email}</Field.ErrorText>
                          </Field.Root>

                          <Field.Root invalid={!!loginErrors.password}>
                            <Field.Label color="gray.300">密码</Field.Label>
                            <InputGroup 
                               startElement={<Icon as={FaLock} color="gray.400" />}
                               endElement={
                                 <IconButton
                                   aria-label={showPassword ? '隐藏密码' : '显示密码'}
                                   icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                   variant="ghost"
                                   size="sm"
                                   color="gray.400"
                                   onClick={() => setShowPassword(!showPassword)}
                                 />
                               }
                             >
                               <Input
                                 type={showPassword ? 'text' : 'password'}
                                 placeholder="请输入密码"
                                 value={loginValues.password}
                                 onChange={(e) => handleLoginChange('password', e.target.value)}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.1)"
                                _hover={{
                                  borderColor: 'brand.500',
                                }}
                                _focus={{
                                  borderColor: 'brand.500',
                                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                                }}
                                color="white"
                                _placeholder={{ color: 'gray.400' }}
                              />
                            </InputGroup>
                            <Field.ErrorText>{loginErrors.password}</Field.ErrorText>
                          </Field.Root>

                          <HStack w="100%" justify="space-between">
                            <Checkbox
                              isChecked={loginValues.rememberMe}
                              onChange={(e) => handleLoginChange('rememberMe', e.target.checked)}
                              colorScheme="cyan"
                              size="sm"
                            >
                              <Text fontSize="sm" color="gray.400">
                                记住我
                              </Text>
                            </Checkbox>
                            <Link
                              fontSize="sm"
                              color="brand.500"
                              _hover={{ color: 'brand.400' }}
                            >
                              忘记密码？
                            </Link>
                          </HStack>

                          <Button
                            type="submit"
                            bg="linear-gradient(45deg, #00ffff, #ff00ff)"
                            color="black"
                            fontWeight="bold"
                            size="lg"
                            w="100%"
                            isLoading={isLoading}
                            loadingText="登录中..."
                            isDisabled={!isLoginValid}
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 25px rgba(0, 255, 255, 0.3)',
                            }}
                          >
                            登录
                          </Button>
                        </VStack>
                      </form>
                    </VStack>
                </Tabs.Content>

                {/* 注册面板 */}
                <Tabs.Content value="register" p={0}>
                    <VStack spacing={6}>
                      <form
                        onSubmit={handleRegisterSubmit(onRegisterSubmit)}
                        style={{ width: '100%' }}
                      >
                        <VStack spacing={4}>
                          <Field.Root invalid={!!registerErrors.username}>
                            <Field.Label color="gray.300">用户名</Field.Label>
                            <InputGroup startElement={<FaUser color="gray.400" />}>
                              <Input
                                placeholder="请输入用户名"
                                value={registerValues.username}
                                onChange={(e) => handleRegisterChange('username', e.target.value)}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.1)"
                                _hover={{
                                  borderColor: 'brand.500',
                                }}
                                _focus={{
                                  borderColor: 'brand.500',
                                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                                }}
                                color="white"
                                _placeholder={{ color: 'gray.400' }}
                              />
                            </InputGroup>
                            <Field.ErrorText>{registerErrors.username}</Field.ErrorText>
                          </Field.Root>

                          <Field.Root invalid={!!registerErrors.email}>
                            <Field.Label color="gray.300">邮箱</Field.Label>
                            <InputGroup startElement={<Icon as={FaEnvelope} color="gray.400" />}>
                              <Input
                                type="email"
                                placeholder="请输入邮箱"
                                value={registerValues.email}
                                onChange={(e) => handleRegisterChange('email', e.target.value)}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.1)"
                                _hover={{
                                  borderColor: 'brand.500',
                                }}
                                _focus={{
                                  borderColor: 'brand.500',
                                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                                }}
                                color="white"
                                _placeholder={{ color: 'gray.400' }}
                              />
                            </InputGroup>
                            <Field.ErrorText>{registerErrors.email}</Field.ErrorText>
                          </Field.Root>

                          <Field.Root invalid={!!registerErrors.password}>
                            <Field.Label color="gray.300">密码</Field.Label>
                            <InputGroup 
                              startElement={<Icon as={FaLock} color="gray.400" />}
                              endElement={
                                <IconButton
                                  aria-label={showPassword ? '隐藏密码' : '显示密码'}
                                  icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                  variant="ghost"
                                  size="sm"
                                  color="gray.400"
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              }
                            >
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="请再次输入密码"
                                value={registerValues.password}
                                onChange={(e) => handleRegisterChange('password', e.target.value)}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.1)"
                                _hover={{
                                  borderColor: 'brand.500',
                                }}
                                _focus={{
                                  borderColor: 'brand.500',
                                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                                }}
                                color="white"
                                _placeholder={{ color: 'gray.400' }}
                              />
                            </InputGroup>
                            <Field.ErrorText>{registerErrors.password}</Field.ErrorText>
                          </Field.Root>

                          <Field.Root invalid={!!registerErrors.confirmPassword}>
                            <Field.Label color="gray.300">确认密码</Field.Label>
                            <InputGroup 
                              startElement={<Icon as={FaLock} color="gray.400" />}
                              endElement={
                                <IconButton
                                  aria-label={showConfirmPassword ? '隐藏密码' : '显示密码'}
                                  icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                  variant="ghost"
                                  size="sm"
                                  color="gray.400"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                              }
                            >
                              <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="请再次输入密码"
                                value={registerValues.confirmPassword}
                                onChange={(e) => handleRegisterChange('confirmPassword', e.target.value)}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.1)"
                                _hover={{
                                  borderColor: 'brand.500',
                                }}
                                _focus={{
                                  borderColor: 'brand.500',
                                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                                }}
                                color="white"
                                _placeholder={{ color: 'gray.400' }}
                              />
                            </InputGroup>
                            <Field.ErrorText>{registerErrors.confirmPassword}</Field.ErrorText>
                          </Field.Root>

                          <Checkbox
                            isChecked={registerValues.agreeToTerms}
                            onChange={(e) => handleRegisterChange('agreeToTerms', e.target.checked)}
                            colorScheme="cyan"
                            size="sm"
                          >
                            <Text fontSize="sm" color="gray.400">
                              我同意{' '}
                              <Link color="brand.500" _hover={{ color: 'brand.400' }}>
                                服务条款
                              </Link>{' '}
                              和{' '}
                              <Link color="brand.500" _hover={{ color: 'brand.400' }}>
                                隐私政策
                              </Link>
                            </Text>
                          </Checkbox>

                          <Button
                            type="submit"
                            bg="linear-gradient(45deg, #00ffff, #ff00ff)"
                            color="black"
                            fontWeight="bold"
                            size="lg"
                            w="100%"
                            isLoading={isLoading}
                            loadingText="注册中..."
                            isDisabled={!isRegisterValid}
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 25px rgba(0, 255, 255, 0.3)',
                            }}
                          >
                            注册
                          </Button>
                        </VStack>
                      </form>
                    </VStack>
                </Tabs.Content>
              </Tabs.Root>

              {/* 分割线 */}
              <HStack my={6}>
                <Separator borderColor="gray.600" />
                <Text color="gray.400" fontSize="sm" px={3}>
                  或
                </Text>
                <Separator borderColor="gray.600" />
              </HStack>

              {/* 第三方登录 */}
              <VStack spacing={3}>
                <Button
                  variant="outline"
                  w="100%"
                  onClick={() => handleSocialLogin('Google')}
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-1px)',
                  }}
                >
                  <FaGoogle />
                  使用 Google 登录
                </Button>
                <Button
                  variant="outline"
                  w="100%"
                  onClick={() => handleSocialLogin('GitHub')}
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-1px)',
                  }}
                >
                  <FaGithub />
                  使用 GitHub 登录
                </Button>
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Box>
  );
}