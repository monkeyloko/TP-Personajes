USE [master]
GO
/****** Object:  Database [DAI-Personajes]    Script Date: 9/6/2023 12:06:25 ******/
CREATE DATABASE [DAI-Personajes]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DAI-Personajes', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\DAI-Personajes.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DAI-Personajes_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\DAI-Personajes_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [DAI-Personajes] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DAI-Personajes].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DAI-Personajes] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ARITHABORT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DAI-Personajes] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DAI-Personajes] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DAI-Personajes] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DAI-Personajes] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DAI-Personajes] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DAI-Personajes] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DAI-Personajes] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DAI-Personajes] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DAI-Personajes] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DAI-Personajes] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DAI-Personajes] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DAI-Personajes] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DAI-Personajes] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DAI-Personajes] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DAI-Personajes] SET RECOVERY FULL 
GO
ALTER DATABASE [DAI-Personajes] SET  MULTI_USER 
GO
ALTER DATABASE [DAI-Personajes] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DAI-Personajes] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DAI-Personajes] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DAI-Personajes] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DAI-Personajes] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'DAI-Personajes', N'ON'
GO
ALTER DATABASE [DAI-Personajes] SET QUERY_STORE = OFF
GO
USE [DAI-Personajes]
GO
/****** Object:  User [Personajes]    Script Date: 9/6/2023 12:06:25 ******/
CREATE USER [Personajes] FOR LOGIN [Personajes] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 9/6/2023 12:06:25 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Personajes]
GO
/****** Object:  Table [dbo].[PeliSeries]    Script Date: 9/6/2023 12:06:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PeliSeries](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](max) NULL,
	[Titulo] [varchar](max) NULL,
	[FechaCreacion] [date] NULL,
	[Calificacion] [int] NULL,
 CONSTRAINT [PK_PeliSeries] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personajes]    Script Date: 9/6/2023 12:06:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personajes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](max) NULL,
	[Nombre] [varchar](max) NULL,
	[Edad] [int] NULL,
	[Peso] [float] NULL,
	[Historia] [varchar](max) NULL,
 CONSTRAINT [PK_Personaje] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonajesxPeliseries]    Script Date: 9/6/2023 12:06:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonajesxPeliseries](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[fkPersonaje] [int] NULL,
	[fkPeliSeries] [int] NULL,
 CONSTRAINT [PK_PersonajesxPeliseries] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[PeliSeries] ON 

INSERT [dbo].[PeliSeries] ([Id], [Imagen], [Titulo], [FechaCreacion], [Calificacion]) VALUES (1, N'http', N'avengers', CAST(N'2016-07-12' AS Date), 9)
INSERT [dbo].[PeliSeries] ([Id], [Imagen], [Titulo], [FechaCreacion], [Calificacion]) VALUES (2, N'htt´d', N'hololive', CAST(N'2017-11-09' AS Date), 1)
INSERT [dbo].[PeliSeries] ([Id], [Imagen], [Titulo], [FechaCreacion], [Calificacion]) VALUES (3, N'hhtp', N'Judio SUS', CAST(N'1939-04-04' AS Date), 1)
INSERT [dbo].[PeliSeries] ([Id], [Imagen], [Titulo], [FechaCreacion], [Calificacion]) VALUES (4, N'http', N'Avengers 2', CAST(N'0100-03-03' AS Date), 2)
SET IDENTITY_INSERT [dbo].[PeliSeries] OFF
GO
SET IDENTITY_INSERT [dbo].[Personajes] ON 

INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (1, N'httpsblabla', N'Gawr gura', 9000, 50, N'no')
INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (2, N'htpppspps', N'Tony stark', 17, 75, N'Chipy')
INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (3, N'httpps', N'oppeheimer', 60, 4, N'Es re sus')
INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (4, N'https ', N'Hulk', 46, 650, N'chucho')
INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (5, N'http1', N'Ivo', 17, 40, N'Es un goblin')
INSERT [dbo].[Personajes] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (6, N'httpsblabla', N'palala', 9000, 50, N'no')
SET IDENTITY_INSERT [dbo].[Personajes] OFF
GO
SET IDENTITY_INSERT [dbo].[PersonajesxPeliseries] ON 

INSERT [dbo].[PersonajesxPeliseries] ([Id], [fkPersonaje], [fkPeliSeries]) VALUES (1, 2, 1)
INSERT [dbo].[PersonajesxPeliseries] ([Id], [fkPersonaje], [fkPeliSeries]) VALUES (2, 4, 1)
INSERT [dbo].[PersonajesxPeliseries] ([Id], [fkPersonaje], [fkPeliSeries]) VALUES (3, 1, 2)
INSERT [dbo].[PersonajesxPeliseries] ([Id], [fkPersonaje], [fkPeliSeries]) VALUES (4, 3, 3)
INSERT [dbo].[PersonajesxPeliseries] ([Id], [fkPersonaje], [fkPeliSeries]) VALUES (6, 5, 4)
INSERT [dbo].[PersonajesxPeliseries] ([Id], [fkPersonaje], [fkPeliSeries]) VALUES (7, 1, 4)
INSERT [dbo].[PersonajesxPeliseries] ([Id], [fkPersonaje], [fkPeliSeries]) VALUES (8, 4, 4)
SET IDENTITY_INSERT [dbo].[PersonajesxPeliseries] OFF
GO
ALTER TABLE [dbo].[PersonajesxPeliseries]  WITH CHECK ADD  CONSTRAINT [FK_PersonajesxPeliseries_PeliSeries] FOREIGN KEY([fkPeliSeries])
REFERENCES [dbo].[PeliSeries] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PersonajesxPeliseries] CHECK CONSTRAINT [FK_PersonajesxPeliseries_PeliSeries]
GO
ALTER TABLE [dbo].[PersonajesxPeliseries]  WITH CHECK ADD  CONSTRAINT [FK_PersonajesxPeliseries_Personajes] FOREIGN KEY([fkPersonaje])
REFERENCES [dbo].[Personajes] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PersonajesxPeliseries] CHECK CONSTRAINT [FK_PersonajesxPeliseries_Personajes]
GO
USE [master]
GO
ALTER DATABASE [DAI-Personajes] SET  READ_WRITE 
GO
