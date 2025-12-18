<?php

namespace App\Entity;

use App\Repository\ProfileRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProfileRepository::class)]
class Profile
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'profiles')]
    private ?User $user = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $telephone = null;

    #[ORM\Column(length: 255)]
    private ?string $sexe = null;

    #[ORM\Column(length: 255)]
    private ?string $nationalite = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $ville_residence = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $parcours_academique = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $niveau_etude_actuel = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $domaine_etude = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $etablissement_actuel = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $moyenne_generale = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $annee_diplome_prevue = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $langue = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $niveau_francais = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $niveau_anglais = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTime $date_naissance = null;

    #[ORM\Column(nullable: true)]
    private ?array $autres_langues = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $experiences_academiques = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $activites_extrascolaires = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $engagement_associatif = null;

    #[ORM\Column(nullable: true)]
    private ?array $recompenses_distinctions = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): static
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getSexe(): ?string
    {
        return $this->sexe;
    }

    public function setSexe(string $sexe): static
    {
        $this->sexe = $sexe;

        return $this;
    }

    public function getNationalite(): ?string
    {
        return $this->nationalite;
    }

    public function setNationalite(string $nationalite): static
    {
        $this->nationalite = $nationalite;

        return $this;
    }

    public function getVilleResidence(): ?string
    {
        return $this->ville_residence;
    }

    public function setVilleResidence(?string $ville_residence): static
    {
        $this->ville_residence = $ville_residence;

        return $this;
    }

    public function getParcoursAcademique(): ?string
    {
        return $this->parcours_academique;
    }

    public function setParcoursAcademique(?string $parcours_academique): static
    {
        $this->parcours_academique = $parcours_academique;

        return $this;
    }

    public function getNiveauEtudeActuel(): ?string
    {
        return $this->niveau_etude_actuel;
    }

    public function setNiveauEtudeActuel(?string $niveau_etude_actuel): static
    {
        $this->niveau_etude_actuel = $niveau_etude_actuel;

        return $this;
    }

    public function getDomaineEtude(): ?string
    {
        return $this->domaine_etude;
    }

    public function setDomaineEtude(?string $domaine_etude): static
    {
        $this->domaine_etude = $domaine_etude;

        return $this;
    }

    public function getEtablissementActuel(): ?string
    {
        return $this->etablissement_actuel;
    }

    public function setEtablissementActuel(?string $etablissement_actuel): static
    {
        $this->etablissement_actuel = $etablissement_actuel;

        return $this;
    }

    public function getMoyenneGenerale(): ?string
    {
        return $this->moyenne_generale;
    }

    public function setMoyenneGenerale(?string $moyenne_generale): static
    {
        $this->moyenne_generale = $moyenne_generale;

        return $this;
    }

    public function getAnneeDiplomePrevue(): ?string
    {
        return $this->annee_diplome_prevue;
    }

    public function setAnneeDiplomePrevue(?string $annee_diplome_prevue): static
    {
        $this->annee_diplome_prevue = $annee_diplome_prevue;

        return $this;
    }

    public function getLangue(): ?string
    {
        return $this->langue;
    }

    public function setLangue(?string $langue): static
    {
        $this->langue = $langue;

        return $this;
    }

    public function getNiveauFrancais(): ?string
    {
        return $this->niveau_francais;
    }

    public function setNiveauFrancais(?string $niveau_francais): static
    {
        $this->niveau_francais = $niveau_francais;

        return $this;
    }

    public function getNiveauAnglais(): ?string
    {
        return $this->niveau_anglais;
    }

    public function setNiveauAnglais(?string $niveau_anglais): static
    {
        $this->niveau_anglais = $niveau_anglais;

        return $this;
    }

    public function getDateNaissance(): ?\DateTime
    {
        return $this->date_naissance;
    }

    public function setDateNaissance(?\DateTime $date_naissance): static
    {
        $this->date_naissance = $date_naissance;

        return $this;
    }

    public function getAutresLangues(): ?array
    {
        return $this->autres_langues;
    }

    public function setAutresLangues(?array $autres_langues): static
    {
        $this->autres_langues = $autres_langues;

        return $this;
    }

    public function getExperiencesAcademiques(): ?string
    {
        return $this->experiences_academiques;
    }

    public function setExperiencesAcademiques(?string $experiences_academiques): static
    {
        $this->experiences_academiques = $experiences_academiques;

        return $this;
    }

    public function getActivitesExtrascolaires(): ?string
    {
        return $this->activites_extrascolaires;
    }

    public function setActivitesExtrascolaires(?string $activites_extrascolaires): static
    {
        $this->activites_extrascolaires = $activites_extrascolaires;

        return $this;
    }

    public function getEngagementAssociatif(): ?string
    {
        return $this->engagement_associatif;
    }

    public function setEngagementAssociatif(?string $engagement_associatif): static
    {
        $this->engagement_associatif = $engagement_associatif;

        return $this;
    }

    public function getRecompensesDistinctions(): ?array
    {
        return $this->recompenses_distinctions;
    }

    public function setRecompensesDistinctions(?array $recompenses_distinctions): static
    {
        $this->recompenses_distinctions = $recompenses_distinctions;

        return $this;
    }
}
