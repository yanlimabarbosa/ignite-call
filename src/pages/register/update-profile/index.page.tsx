import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { UpdateProfileService } from '../../../services/update-profile/update-profile.service'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { Container, Header } from '../styles'
import { updateProfileFormSchema } from './schemas/update-profile-form-schema'
import { FormAnnotation, ProfileBox } from './styles'
import { UpdateProfileData } from './types/update-profile-data'

export default function UpdateProfile() {
  const router = useRouter()
  const session = useSession()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  async function handleUpdateProfile(data: UpdateProfileData) {
    const updateProfileService = new UpdateProfileService()
    await updateProfileService.update({
      bio: data.bio,
    })

    await router.push(`/schedule/${session?.data?.user?.username}`)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Defina sua disponibilidade</Heading>
        <Text>Por último, uma breve descrição e uma foto de perfil.</Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Foto de perfil</Text>
          <Avatar src={session.data?.user.avatar_url} />
          {/* <img src={session.data?.user.avatar_url} /> */}
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} />
          <FormAnnotation>
            Fale um pouco sobre você. Isto será exibido em sua pagina pessoal.
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
