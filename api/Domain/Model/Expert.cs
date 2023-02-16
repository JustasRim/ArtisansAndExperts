﻿using Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace Domain.Model
{
    public class Expert : BaseEntity
    {
        public string? ProfileSrc { get; set; }

        public string? WorkDescription { get; set; }

        [Required]
        [Phone]
        public string? MobilePhone { get; set; }

        [Required]
        [StringLength(100)]
        public string? City { get; set; }

        [Required]
        public int Radius { get; set; }

        public IList<Activity>? Activities { get; set; }

        public IList<Offer>? Offers { get; set; }
    }
}
