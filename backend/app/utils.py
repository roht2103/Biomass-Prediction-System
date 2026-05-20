def get_pasture_condition(dry_total_g: float) -> str:
    """
    Determine pasture condition based on total dry biomass.
    """
    if dry_total_g < 30:
        return "🔴 Low pasture availability"
    elif dry_total_g < 80:
        return "🟡 Moderate pasture condition"
    elif dry_total_g < 150:
        return "🟢 Good pasture condition"
    else:
        return "🌿 High pasture density"
